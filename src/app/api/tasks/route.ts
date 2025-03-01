import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: Request) {
  try {
    console.log('GET TASKS');
    const tasks = await prisma.task.findMany();
    console.log('TASKS =>', tasks);
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
    console.log('ERROR =>', error)
    return NextResponse.json({
      error: error.message || "Something went wrong"
    }, { status: 500 });
  }
}

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const data = await req.json();
    console.log('BODY [ADD TASKS] =>', data);
    const task = await prisma.task.create({ data });
    console.log('TASK =>', task);
    return NextResponse.json(task, {  status: 201 });
  } catch (error) {
    return NextResponse.json({
      error: "Something went wrong"
    }, {  status: 500 });
  }
}