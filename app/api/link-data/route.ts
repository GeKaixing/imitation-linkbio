// app/api/data/route.js

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_PATH = path.join(__dirname, '../../../data/LinkData.json');

function readData() {
  const data = fs.readFileSync(DB_PATH, 'utf-8');
  return JSON.parse(data);
}

function writeData(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
}

// ✅ GET: 返回所有数据
export async function GET() {
  try {
    const data = readData();
    return Response.json(data); // ✅ 返回数据
  } catch (error) {
    return Response.json({ error: '读取失败' }, { status: 500 });
  }
}

// ✅ POST: 添加并返回新增的数据
export async function POST(request) {
  try {
    const body = await request.json();
    const data = readData();

    if (data.some(item => item.id === body.id.id)) {
      return Response.json({ error: 'ID 已存在' }, { status: 400 });
    }

    data.push(body);
    writeData(data);

    return Response.json(body, { status: 201 }); // ✅ 返回新增的数据
  } catch (error) {
    return Response.json({ error: '添加失败' }, { status: 500 });
  }
}

// ✅ PUT: 更新并返回更新后的数据
export async function PUT(request) {
  try {
    const body = await request.json();
    const { id } = body;
    console.log(id)
    if (!id) {
      return Response.json({ error: '缺少 ID' }, { status: 400 });
    }

    const data = readData();
    const index = data.findIndex(item => item.id === id);
    if (index === -1) {
      return Response.json({ error: '未找到该 ID' }, { status: 404 });
    }

    data[index] = { ...data[index], ...body }; // 合并更新
    writeData(data);

    return Response.json(data[index]); // ✅ 返回更新后的完整对象
  } catch (error) {
    return Response.json({ error: '更新失败' }, { status: 500 });
  }
}

// ✅ DELETE: 删除并返回删除成功的 ID 和状态
export async function DELETE(request) {
  try {
    const { id } = await request.json();
    if (!id) {
      return Response.json({ error: '缺少 ID' }, { status: 400 });
    }

    const data = readData();
    const oldLength = data.length;
    const newData = data.filter(item => item.id !== id.id);

    if (oldLength === newData.length) {
      return Response.json({ error: '未找到该 ID' }, { status: 404 });
    }

    writeData(newData);

    return Response.json({ 
      success: true, 
      id, 
      message: '删除成功' 
    }); // ✅ 明确返回删除成功的信息
  } catch (error) {
    return Response.json({ error: '删除失败' }, { status: 500 });
  }
}