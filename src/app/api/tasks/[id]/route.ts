import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    // Get task by ID as a parameter
    const id = parseInt(params.id, 10);
    console.log('ID =>', id);

    if (isNaN(id)) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    // Use ID to fetch task using prisma
    const task = await prisma.task.findUnique({ where: { id } });
    console.log('TASK =>', task);
    
    if (!task) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    const serializedTask = {
      ...task,
      id: task.id.toString(), // Convert BigInt to string
    };
    
    return NextResponse.json({ message: "Task fetched successfully", data: serializedTask }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({
      error: error?.message || "Something went wrong"
    }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    // Get task by ID as a parameter
    const id = parseInt(params.id, 10);
    console.log('ID =>', id);

    if (isNaN(id)) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const body = await req.json();

    // Use ID to fetch task using prisma
    const task = await prisma.task.findUnique({ where: { id } });
    console.log('TASK =>', task);
    
    if (!task) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }
    
    const updatedTask = await prisma.task.update({ where: { id }, data: body });
    console.log('UPDATED TASK =>', updatedTask);
    
    return NextResponse.json({ message: "Task updated successfully" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({
      error: error?.message || "Something went wrong"
    }, { status: 500 });
  }
}