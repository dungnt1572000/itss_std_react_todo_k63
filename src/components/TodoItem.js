import { useState } from "react";

/* 
  【TodoItemコンポーネント】
　・Todoアイテムを表示する
　・チェックボックスにチェックが入っているか管理する
　・チェックボックスにチェックが入っているかアイテムをグレーアウトする
*/

function TodoItem({ key, text, done, handleChangeDone } ) {
  return (
     <label
      className="panel-block"
      onClick={handleChangeDone}
      style={done ? { color: "gray" } : {}}
    >
      <input type="checkbox" checked={done ? true : false} />
      {text}
    </label>
  );
}

export default TodoItem;