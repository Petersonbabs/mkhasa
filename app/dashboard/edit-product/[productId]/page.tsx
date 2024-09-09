import React from 'react';
import { Wrapper } from '@/components/wrapper';
import EditProduct from '@/components/editProduct';

interface EditProductPageProps {
  params: {
    productId: string;
  };
}

const EditProductPage = ({ params }: EditProductPageProps) => {
  return (
    <Wrapper>
      <EditProduct productId={params.productId} />
    </Wrapper>
  );
};

export default EditProductPage;