import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const DB_PATH = path.join(process.cwd(), "data", "UserData.json");

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: "缺少邮箱或密码" }, { status: 400 });
    }

    const fileData = await fs.readFile(DB_PATH, "utf-8");
    const users = JSON.parse(fileData);

    const existingUser = users.find((u: any) => u["user-email"] === email);
    if (existingUser) {
      return NextResponse.json({ error: "该邮箱已注册" }, { status: 409 });
    }

    const newUser = {
      "user-id": users.length > 0 ? users[users.length - 1]["user-id"] + 1 : 1,
      "user-email": email,
      "user-password": password,
    };

    users.push(newUser);
    await fs.writeFile(DB_PATH, JSON.stringify(users, null, 2), "utf-8");

    const { ["user-password"]: _, ...safeUser } = newUser;
    return NextResponse.json({
      message: "注册成功",
      user: safeUser,
    });
  } catch (error) {
    console.error("Register API Error:", error);
    return NextResponse.json({ error: "服务器内部错误" }, { status: 500 });
  }
}
