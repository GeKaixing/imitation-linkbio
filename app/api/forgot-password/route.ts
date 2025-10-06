import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const DB_PATH = path.join(process.cwd(), "data", "UserData.json");

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "请输入邮箱" }, { status: 400 });
    }

    const fileData = await fs.readFile(DB_PATH, "utf-8");
    const users = JSON.parse(fileData);

    const userIndex = users.findIndex((u: any) => u["user-email"] === email);

    if (userIndex === -1) {
      return NextResponse.json({ error: "邮箱未注册" }, { status: 404 });
    }

    // 模拟生成临时密码
    const tempPassword = Math.random().toString(36).slice(-8);

    // 更新用户密码为临时密码
    users[userIndex]["user-password"] = tempPassword;
    await fs.writeFile(DB_PATH, JSON.stringify(users, null, 2), "utf-8");

    // 返回临时密码（真实场景应该发邮件）
    return NextResponse.json({ message: "临时密码已生成", tempPassword });
  } catch (error) {
    console.error("Forgot Password API Error:", error);
    return NextResponse.json({ error: "服务器错误" }, { status: 500 });
  }
}
