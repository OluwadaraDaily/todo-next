import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Get task by ID as a parameter
    const id = Array.isArray(req.query.id) ? parseInt(req.query.id[0], 10) : typeof req.query.id === 'string' ? (parseInt(req.query.id, 10)) : null;

    console.log('ID =>', id);
    
    if (!id) {
      return res.status(400).json({
        error: "ID is required"
      });
    }

    // Use ID to fetch task using prisma
    const task = await prisma.task.findUnique({ where: { id } });
    console.log('TASK =>', task);
    
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({
      error: "Something went wrong"
    });
  }
}