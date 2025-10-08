// app/api/data/route.js

import fs from "fs";
import { NextResponse } from "next/server";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_PATH = path.join(__dirname, "../../../data/LinkData.json");

function readData() {
  const data = fs.readFileSync(DB_PATH, "utf-8");
  return JSON.parse(data);
}

function writeData(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), "utf-8");
}

// ✅ GET: 返回所有数据
export async function GET(request) {
  try {
    const data = readData();
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("user_id");
    console.log(userId);
    const user_domain = searchParams.get("user_domain");
    console.log(user_domain);
    if (userId) {
      const user = data.filter((u: any) => u.authorId?.toString() === userId);
      if (!user) {
        return NextResponse.json({ error: "用户不存在" }, { status: 404 });
      }
      return Response.json(user); // ✅ 返回数据
    } else if (user_domain) {
      const user = data.filter(
        (u: any) => u.domain?.toString() === user_domain
      );
      if (!user) {
        return NextResponse.json({ error: "域名不存在" }, { status: 404 });
      }
      return Response.json(user); // ✅ 返回数据ƒ
    }

    return Response.json(data); // ✅ 返回数据
  } catch (error) {
    return Response.json({ error: "读取失败" }, { status: 500 });
  }
}

// ✅ POST: 添加并返回新增的数据
export async function POST(request) {
  try {
    const body = await request.json();
    const data = readData();
    console.log(body.id);
    if (data.some((item) => item.id === body.id)) {
      return Response.json({ error: "ID 已存在" }, { status: 400 });
    }
    const res = await fetch(
      `https://iframe.ly/api/iframely?api_key=${
       "54b03f3e79db48187c96d0"
      }&url=${encodeURIComponent(body.link)}`
    );
 
    const data2 = await res.json();
    data.push({...body,embedCode:data2.html,icon:data2.links.icon[0].href,});
    writeData(data);

    return Response.json({...body,embedCode:data2.html,icon:data2.links.icon[0].href}, { status: 201 }); // ✅ 返回新增的数据
  } catch (error) {
    return Response.json({ error: "添加失败" }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();

    const data = readData();

    // ✅ 判断是批量更新（数组）还是单条更新（对象）
    if (Array.isArray(body)) {
      let updated = [];
      body.forEach((updateItem) => {
        const index = data.findIndex((item) => item.id === updateItem.id);
        if (index !== -1) {
          data[index] = { ...data[index], ...updateItem };
          updated.push(data[index]);
        }
      });

      writeData(data);
      return Response.json({
        message: "批量更新成功",
        updated,
      });
    } else {
      // ✅ 单条更新逻辑（保持原功能）
      const { id } = body;
      if (!id) {
        return Response.json({ error: "缺少 ID" }, { status: 400 });
      }

      const index = data.findIndex((item) => item.id === id);
      if (index === -1) {
        return Response.json({ error: "未找到该 ID" }, { status: 404 });
      }

      data[index] = { ...data[index], ...body };
      writeData(data);

      return Response.json(data[index]);
    }
  } catch (error) {
    console.error(error);
    return Response.json({ error: "更新失败" }, { status: 500 });
  }
}

// ✅ DELETE: 删除并返回删除成功的 ID 和状态
export async function DELETE(request) {
  try {
    const { id } = await request.json();
    if (!id) {
      return Response.json({ error: "缺少 ID" }, { status: 400 });
    }

    const data = readData();
    const oldLength = data.length;
    const newData = data.filter((item) => item.id !== id.id);

    if (oldLength === newData.length) {
      return Response.json({ error: "未找到该 ID" }, { status: 404 });
    }

    writeData(newData);

    return Response.json({
      success: true,
      id,
      message: "删除成功",
    }); // ✅ 明确返回删除成功的信息
  } catch (error) {
    return Response.json({ error: "删除失败" }, { status: 500 });
  }
}
