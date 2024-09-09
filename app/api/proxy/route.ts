import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const path = searchParams.get('path');
  const adminId = searchParams.get('adminId');

  if (!process.env.BASE_URL) {
    return NextResponse.json({ error: 'BASE_URL is not defined' }, { status: 500 });
  }

  try {
    let apiUrl = `${process.env.BASE_URL}/${path}`;

    // Append adminId if it's not a categories request
    if (path !== 'all/category' && path !== 'top/selling' && adminId) {
      apiUrl += `/${adminId}`;
    }

    const response = await fetch(apiUrl);
    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'An error occurred while fetching data' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const path = searchParams.get('path');
  const adminId = searchParams.get('adminId');

  if (!process.env.BASE_URL) {
    return NextResponse.json({ error: 'BASE_URL is not defined' }, { status: 500 });
  }

  try {
    const productData = await request.json();
    const apiUrl = `${process.env.BASE_URL}/${path}/${adminId}`;

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'An error occurred while adding the product' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const path = searchParams.get('path');

  if (!process.env.BASE_URL) {
    return NextResponse.json({ error: 'BASE_URL is not defined' }, { status: 500 });
  }

  try {
    const apiUrl = `${process.env.BASE_URL}/${path}`;

    const response = await fetch(apiUrl, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'An error occurred while deleting the product' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const { searchParams } = new URL(request.url);
  const path = searchParams.get('path');

  if (!process.env.BASE_URL) {
    return NextResponse.json({ error: 'BASE_URL is not defined' }, { status: 500 });
  }

  try {
    const apiUrl = `${process.env.BASE_URL}/${path}`;
    const body = await request.formData(); // Use formData for multipart form data

    const response = await fetch(apiUrl, {
      method: 'PUT',
      body: body,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'An error occurred while updating the product' }, { status: 500 });
  }
}
