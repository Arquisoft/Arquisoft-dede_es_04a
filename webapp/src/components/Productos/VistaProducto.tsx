import React from 'react'
import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from "@cloudinary/url-gen";
import { pad } from "@cloudinary/url-gen/actions/resize";

type Props = {
    productName: string
    productDesc: string
    productPrice: string
    productImage: string
}


export const VistaProducto = ({}: Props) => {


    const cld = new Cloudinary({
        cloud: {
            cloudName: 'dede4a'
        }
    });

  return (
    <div>
        
    </div>
    
  )
}
