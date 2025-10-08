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

    // 1️⃣ 读取数据库文件
    const fileData = await fs.readFile(DB_PATH, "utf-8");
    const users = JSON.parse(fileData);

    // 2️⃣ 检查是否已注册
    const existingUser = users.find((u: any) => u.user_email === email);
    if (existingUser) {
      return NextResponse.json({ error: "该邮箱已注册" }, { status: 409 });
    }

    // 3️⃣ 调用 Umami API 创建网站
    const umamiRes = await fetch(`${process.env.UMAMI_API_URL}/websites`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.UMAMI_API_TOKEN}`,
      },
      body: JSON.stringify({
        name: `${email}-site`,
        domain: `${email.split("@")[0]}.yourapp.com`, // 你可以自定义
      }),
    });

    if (!umamiRes.ok) {
      const errText = await umamiRes.text();
      console.error("Umami 创建网站失败:", errText);
      return NextResponse.json({ error: "Umami 创建网站失败" }, { status: 500 });
    }

    const { website_id } = await umamiRes.json();

    // 4️⃣ 创建新用户
    const newUser = {
      "user_id": users.length > 0 ? users[users.length - 1]["user_id"] + 1 : 1,
      "user_email": email,
      "user_password": password,
      "user_website_id": website_id, // 👈 保存 Umami 网站 ID
    };

    users.push(newUser);
    await fs.writeFile(DB_PATH, JSON.stringify(users, null, 2), "utf-8");

    // 5️⃣ 返回安全信息
    const { user_password: _, ...safeUser } = newUser;
    return NextResponse.json({
      message: "注册成功",
      user: safeUser,
    });
  } catch (error) {
    console.error("Register API Error:", error);
    return NextResponse.json({ error: "服务器内部错误" }, { status: 500 });
  }
}
