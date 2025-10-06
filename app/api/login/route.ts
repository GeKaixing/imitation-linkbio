import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

// ✅ 使用 process.cwd() 而不是 __dirname
const DB_PATH = path.join(process.cwd(), "data", "UserData.json");

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: "缺少邮箱或密码" }, { status: 400 });
    }

    // ✅ 读取 JSON 文件内容
    const fileData = await fs.readFile(DB_PATH, "utf-8");
    const users = JSON.parse(fileData);

    // ✅ 查找匹配的用户
    const user = users.find(
      (u: any) =>
        u["user_email"] === email && u["user_password"].toString() === password
    );

    if (!user) {
      return NextResponse.json({ error: "邮箱或密码错误" }, { status: 401 });
    }

    // ✅ 登录成功，隐藏密码
    const { ["user_password"]: _, ...safeUser } = user;

    return NextResponse.json({
      message: "登录成功",
      user: safeUser,
    });
  } catch (error) {
    console.error("Login API Error:", error);
    return NextResponse.json({ error: "服务器内部错误" }, { status: 500 });
  }
}


export async function GET(request: Request) {
  try {
    // ✅ 从 URL 获取查询参数 ?user-id=1
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("user_id");

    if (!userId) {
      return NextResponse.json({ error: "缺少 user_id 参数" }, { status: 400 });
    }

    // ✅ 读取 JSON 文件
    const fileData = await fs.readFile(DB_PATH, "utf-8");
    const users = JSON.parse(fileData);

    // ✅ 查找用户
    const user = users.find((u: any) => u.user_id?.toString() === userId);

    if (!user) {
      return NextResponse.json({ error: "用户不存在" }, { status: 404 });
    }

    // ✅ 隐藏密码
    const { user_password: _, ...safeUser } = user;

    return NextResponse.json({
      message: "获取成功",
      user: safeUser,
    });
  } catch (error) {
    console.error("Get User Error:", error);
    return NextResponse.json({ error: "服务器内部错误" }, { status: 500 });
  }
}
