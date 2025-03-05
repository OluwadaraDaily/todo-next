import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: Request) {
  try {
    const tasks = await prisma.task.findMany();

    if (!tasks) {
      return NextResponse.json({
        error: "No tasks found"
      }, { status: 404 });
    }
    const serializedTasks = tasks.map((task) => ({
      ...task,
      id: task.id.toString(), // Convert BigInt to string
    }));
    return NextResponse.json(serializedTasks, {  status: 200 });
  } catch (error: any) {
    return NextResponse.json({
      error: error.message || "Something went wrong"
    }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const task = await prisma.task.create({ data });
    
    const serializedTask = {
      ...task,
      id: task.id.toString(), // Convert BigInt to string
    };

    return NextResponse.json(serializedTask, {  status: 201 });
  } catch (error) {
    return NextResponse.json({
      error: "Something went wrong"
    }, {  status: 500 });
  }
}