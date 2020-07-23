import React from "react";
import { Image, Container } from "react-bootstrap";
import { useSelector } from "react-redux";

function MyImage(props) {
  const page = useSelector((state) => state.componentsInfo);

  let gelenler;
  page
    .filter((card, i) => card.id === props.id)
    .map((item, id) => {
      gelenler = item;
    });

  if (gelenler !== undefined)
    return (
      <Container>
        {" "}
        <Image
          className="d-block w-100"
          src={"http://127.0.0.1:3000" + gelenler.src}
        />
      </Container>
    );

  return <div>This component deleted. </div>;
}

export default MyImage;
