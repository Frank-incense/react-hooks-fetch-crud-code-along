import React from "react";
import { API_URL } from "./ShoppingList";

function Item({ item , onUpdateItem, onDeleteItem}) {

  function handleAddToCartClick() {
    console.log("clicked item:", item);
    fetch(`${API_URL  }/${item.id}`,{
      method: "PATCH",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({
        isInCart: !item.isInCart,
      }) 
    }).then((r) => r.json())
      .then((updatedItem) => onUpdateItem(updatedItem))
  }

  function handleDelete(){
    fetch(`${API_URL}/${item.id}`,{
      method: 'DELETE'
    })
    .then(r => r.json())
    .then(() => {
      onDeleteItem(item)
    })
  }

  return (
    <li className={item.isInCart ? "in-cart" : ""}>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>
      <button className={item.isInCart ? "remove" : "add"} onClick={handleAddToCartClick}>
        {item.isInCart ? "Remove From" : "Add to"} Cart
      </button>
      <button className="remove" onClick={()=> handleDelete(item.id)}>Delete</button>
    </li>
  );
}

export default Item;
