import express from 'express';
import 'dotenv/config';
import { prisma } from './prisma';
import path from 'path';
import cookieParser from 'cookie-parser';

const app = express();
const port = process.env.PORT || 8080;

app.set('trust proxy', true);
app.use(cookieParser());

const allowedIp = process.env.ALLOWED_IP;

app.use((req, res, next) => {
  if (req.path !== '/') {
    next();
    return;
  }

  // Cookie blocking mechanism
  if (req.ip === allowedIp && req.query.dev === 'true') {
    next();
    return;
  }

  if (req.cookies['visited'] === '1') {
    console.log(req.ip, 'Cookie exists, user has already visited this website');
    res.status(403).send('You have already visited this website');
    return;
  }

  res.cookie('visited', 1, { maxAge: 1000 * 60 * 60 * 24 * 365 });
  next();
});

app.use(async (req, res, next) => {
  if (req.path !== '/') {
    next();
    return;
  }

  const clientIP = req.ip;
  console.log('clientIP', clientIP);

  // Backdoor so we can test the app without being blocked automatically
  if (clientIP === allowedIp && req.query.dev === 'true') {
    next();
    return;
  }

  if (typeof clientIP !== 'string') {
    console.log('Invalid IP');
    res.status(403).send('You have already visited this website');
    return;
  }

  const user = await prisma.user.findUnique({ where: { ip: req.ip } });

  if (user) {
    console.log(req.ip, 'User already exists');
    res.status(403).send('You have already visited this website');
    return;
  }

  await prisma.user.create({ data: { ip: clientIP } });

  next();
});

app.use(express.json());

app.use(express.static(path.resolve('../frontend/dist')));

const PAGE_SIZE = 10;

async function getMostUpvotedAdvice(userId: number, page: number) {
  const offset = page * PAGE_SIZE;

  const result = await prisma.$queryRaw`
 SELECT
    "advice"."id",
    "advice"."advice",
    "advice"."createdAt",
    COALESCE(SUM("votes"."vote"), 0) AS "netVotes",
    CASE 
        WHEN COALESCE(SUM(CASE WHEN "votes"."userId" = ${userId} THEN "votes"."vote" ELSE 0 END), 0) > 0 THEN 1
        WHEN COALESCE(SUM(CASE WHEN "votes"."userId" = ${userId} THEN "votes"."vote" ELSE 0 END), 0) < 0 THEN -1
        ELSE 0
    END AS "userVoteStatus"
FROM
    "Advice" AS "advice"
    LEFT JOIN "Votes" AS "votes" ON "advice"."id" = "votes"."adviceId"
GROUP BY
    "advice"."id", "advice"."advice", "advice"."createdAt"
ORDER BY
    "netVotes" DESC,
    "advice"."createdAt" DESC
LIMIT ${PAGE_SIZE} OFFSET ${offset};`;

  const formattedResult = (result as any).map((row: any) => ({
    ...row,
    netVotes: Number(row.netVotes), // Convert BigInt to Number
  }));

  return formattedResult;
}

const getMostRecentAdvice = async (userId: number, page: number) => {
  const offset = page * PAGE_SIZE;

  const result = await prisma.$queryRaw`
  SELECT
    "advice"."id",
    "advice"."advice",
    "advice"."createdAt",
    SUM("votes"."vote") AS "netVotes",
    CASE WHEN SUM(
      CASE WHEN "votes"."userId" = ${userId} THEN
        "votes"."vote"
      ELSE
        0
      END) > 0 THEN
      1
    WHEN SUM(
      CASE WHEN "votes"."userId" = ${userId} THEN
        "votes"."vote"
      ELSE
        0
      END) < 0 THEN
      - 1
    ELSE
      0
    END AS "userVoteStatus"
  FROM
    "Advice" AS "advice"
    LEFT JOIN "Votes" AS "votes" ON "advice"."id" = "votes"."adviceId"
  GROUP BY
    "advice"."id"
  ORDER BY
    "createdAt" DESC
  LIMIT ${PAGE_SIZE} OFFSET ${offset};`;

  const formattedResult = (result as any).map((row: any) => ({
    ...row,
    netVotes: Number(row.netVotes), // Convert BigInt to Number
  }));

  return formattedResult;
};

const checkIfHasMore = async (page: number) => {
  const numberOfAdvice = await prisma.advice.count();
  return numberOfAdvice > (page + 1) * PAGE_SIZE;
};

app.get('/api/v1/advice', async (req, res) => {
  if (req.query.filter !== 'top' && req.query.filter !== 'recent') {
    res.status(400).send('Invalid filter');
    return;
  }

  const page = Number(req.query.page) || 0;

  try {
    const user = await prisma.user.findUnique({
      where: {
        ip: req.ip,
      },
    });

    if (!user) {
      res.status(400).send('Invalid user');
      return;
    }

    if (req.query.filter === 'top') {
      const advice = await getMostUpvotedAdvice(user.id, page);
      const hasMore = await checkIfHasMore(page);
      res.status(200).send({ data: advice, hasMore });
      return;
    }

    const advice = await getMostRecentAdvice(user.id, page);
    const hasMore = await checkIfHasMore(page);

    res.status(200).send({ data: advice, hasMore });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.get('/api/v1/fingerprint', async (req, res) => {
  try {
    const id = req.query.id;

    if (typeof id !== 'string') {
      res.status(400).send('Invalid id');
      return;
    }

    const fingerprintExists = await prisma.browserFingerprint.findUnique({
      where: { fingerprint: id },
    });

    if (fingerprintExists) {
      res.sendStatus(200);
      return;
    }

    await prisma.browserFingerprint.create({
      data: { fingerprint: id },
    });

    res.sendStatus(404);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.put('/api/v1/advice/:id', async (req, res) => {
  try {
    const adviceId = Number(req.params.id);
    const vote = Number(req.body.vote);

    if (Number.isNaN(adviceId)) {
      res.status(400).send('Invalid advice id');
      return;
    }

    if (vote !== 1 && vote !== -1 && vote !== 0) {
      res.status(400).send('Invalid vote');
      return;
    }

    if (req.ip === undefined) {
      res.status(400).send('Invalid ip');
      return;
    }

    const user = await prisma.user.findUnique({
      where: {
        ip: req.ip,
      },
    });

    if (!user?.id) {
      res.status(400).send('Invalid user');
      return;
    }

    const response = await prisma.votes.upsert({
      update: { vote, adviceId, userId: user.id },
      create: { vote, adviceId, userId: user.id },
      where: { userId_adviceId: { userId: user.id, adviceId } },
    });

    res.send(response);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.post('/api/v1/advice', async (req, res) => {
  const advice = req.body.advice;

  if (typeof advice !== 'string') {
    res.status(400).send('Missing advice');
    return;
  }
  try {
    const response = await prisma.advice.create({ data: { advice } });
    res.status(200).send(response);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
