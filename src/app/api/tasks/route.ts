import { prisma } from "@/lib/prisma";
import { NextApiResponse, NextApiRequest } from "next";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const tasks = await prisma.task.findMany();
  console.log('TASKS =>', tasks);

  res.status(200).json(tasks);
}

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { body: data } = await req;
    console.log('BODY [ADD TASKS] =>', data);
    const task = await prisma.task.create({ data });
    console.log('TASK =>', task);
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({
      error: "Something went wrong"
    })
  }
}