import React from "react";
import Card from "./Card";

const List = () => {
  const list1 = [1, 2, 3, 4, 5, 6, 8, 11, 13, 15];
  const list2 = [16, 4423, 17, 18, 168, 169, 171, 174, 177, 184];

  return (
    <>
      <div className="relative">
        <div className="flex animate-trackLeft">
          {list1.map((el) => (
            <Card key={el} idx={el} url="#" />
          ))}
        </div>
        <div className="absolute top-0 flex animate-trackLeft2">
          {list1.map((el) => (
            <Card key={el + "-2"} idx={el} url="#" />
          ))}
        </div>
      </div>
      <div className="relative">
        <div className="flex animate-trackRight">
          {list2.map((el) => (
            <Card key={el} idx={el} url="#" />
          ))}
        </div>
        <div className="absolute top-0 flex animate-trackRight2">
          {list2.map((el) => (
            <Card key={el + "-2"} idx={el} url="#" />
          ))}
        </div>
      </div>
    </>
  );
};

export default List;
