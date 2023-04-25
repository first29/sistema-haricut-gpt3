import React, { useRef } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
`;

const StyledInput = styled.input`
  margin-bottom: 20px;
`;

const StyledImg = styled.img`
  width: 100%;
  height: auto;
`;

const HairstylePreview = () => {
  const imageRef = useRef(null);
  const hairstyleRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => {
      imageRef.current.src = reader.result;
    };
  };

  const handleHairstyleUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => {
      hairstyleRef.current.src = reader.result;
    };
  };

  const handleHairstylePreview = () => {
    const canvas = document.createElement('canvas');
    canvas.width = imageRef.current.width;
    canvas.height = imageRef.current.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(imageRef.current, 0, 0);

    const dataURI = canvas.toDataURL();
    fetch('http://localhost:5000/hairstyle-preview', {
      method: 'POST',
      body: JSON.stringify({ dataURI }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((data) => {
        hairstyleRef.current.src = data.hairstylePreview;
      });
  };

  return (
    <Container>
      <StyledInput type="file" accept="image/*" onChange={handleImageUpload} />
      <StyledImg ref={imageRef} alt="Uploaded Image" />
      <StyledInput type="file" accept="image/*" onChange={handleHairstyleUpload} />
      <StyledImg ref={hairstyleRef} alt="Hairstyle Preview" />
      <button onClick={handleHairstylePreview}>Preview Hairstyle</button>
    </Container>
  );
};

export default HairstylePreview;
