import express from 'express';
import 'dotenv/config';
import path from 'path';
import { prisma } from './prisma';

const app = express();
const port = process.env.PORT || 8080;

app.use(express.static('public'));

app.get('*', async (req, res) => {
  if (typeof req.ip !== 'string') {
    res.redirect('https://www.google.com');
    return;
  }
  try {
    const user = await prisma.user.findUnique({
      where: {
        ip: req.ip,
      },
    });

    if (user) {
      res.redirect('https://www.google.com');
      return;
    }

    res.sendFile(path.resolve('../frontend/dist/index.html'));

    await prisma.user.create({
      data: {
        ip: req.ip,
      },
    });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

async function getMostUpvotedAdvice() {
  const adviceWithVotes = await prisma.advice.findMany({
    take: 10,
    select: {
      id: true,
      advice: true,
      _count: {
        select: {
          Votes: {
            where: {
              value: 1, // Filter to count only upvotes
            },
          },
        },
      },
    },
    orderBy: {
      Votes: { _count: 'desc' }, // Sort by the number of upvotes in descending order
    },
  });

  return adviceWithVotes;
}

// TODO: Implement pagination
app.get('/api/v1/advice', (req, res) => {
  if (req.query.filter !== 'top' && req.query.filter !== 'recent') {
    res.status(400).send('Invalid filter');
    return;
  }

  try {
    if (req.query.filter === 'top') {
      const advice = getMostUpvotedAdvice();
      res.status(200).send(advice);
      return;
    }

    const advice = prisma.advice.findMany({
      take: 10,
      orderBy: {
        createdAt: 'desc',
      },
    });

    res.status(200).send(advice);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.put('/api/v1/advice/:id', async (req, res) => {
  try {
    // vote: 1 for upvote, -1 for downvote
    // const
    const adviceId = req.body.id;
    const vote = req.body.vote;

    if (typeof adviceId !== 'number') {
      res.status(400).send('Invalid advice id');
      return;
    }

    if (typeof vote !== 'number' || (vote !== 1 && vote !== -1)) {
      res.status(400).send('Invalid vote');
      return;
    }

    if (req.ip === undefined) {
      res.status(400).send('Invalid ip');
      return;
    }

    // await prisma.votes.upsert({
    //   create: {
    //     value: vote,
    //     user: {
    //       connect: {
    //         ip: req.ip,
    //       },
    //     },
    //     advice: {
    //       connect: {
    //         id: adviceId,
    //       },
    //     },
    //   },
    //   update: {
    //     value: vote,
    //   },
    //   where: {

    //   }
    // });
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
