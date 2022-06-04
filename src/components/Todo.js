import React, { useState } from 'react';

/* 
  【Todoのデータ構成】
　・key：Todoを特定するID（String）
　・text：Todoの内容（String）
　・done：完了状態（Boolean true:完了済み,, false:未完了）
*/

/* コンポーネント */
import TodoItem from './TodoItem';
import Input from './Input';
import Filter from './Filter';

/* カスタムフック */
import useStorage from '../hooks/storage';

/* ライブラリ */
import {getKey} from "../lib/util";

function Todo() {
  const [items, putItems] = React.useState([
      /* テストコード 開始 */
    { key: getKey(), text: '日本語の宿題', done: false },
    { key: getKey(), text: 'reactを勉強する', done: false },
    { key: getKey(), text: '明日の準備をする', done: false },
    /* テストコード 終了 */
  ]);
  const [newItem, setNewItem] = React.useState({
    key: getKey(),
    text: "",
    done: false,
  });
  const [filterItems, setFilterItems] = useState(items);
const handleChangeDone = (key) => {
    putItems(
      items.map((item) => {
        if (item.key === key) {
          item.done = !item.done;
        }

        return item;
      })
    );
  };
   const handleSelectAll = () => {
    putItems(filterItems);
     console.log('Select All')
  };
   const handleSelectDoneOnly = () => {
    putItems(filterItems.filter((filterItem) => filterItem.done === true));
  };

  const handleSelectNotDoneOnly = () => {
    putItems(filterItems.filter((filterItem) => filterItem.done === false));
  };
    const handleNewItemNameChange = (event) => {
    setNewItem({ ...newItem, text: event.target.value });
  };
    const handleAddNewItem = () => {
    putItems([...items, newItem]);
      setFilterItems([...items, newItem]);
    setNewItem({
      key: getKey(),
      text: "",
      done: false,
    });
  };
  return (
    <div className="panel">
      <div className="panel-heading">
        ITSS ToDoアプリ
      </div>
        <div style={{ display: "flex", paddingBottom: "20px" }}>
        <div style={{ marginRight: "10px", width: "100%" }}>
          <input
            type="text"
            onChange={handleNewItemNameChange}
            className="input"
            value={newItem.text}
            placeholder="Add new item"
          />
        </div>
            <button onClick={handleAddNewItem} class="button">
          Add
        </button>
      </div>
            <div
        style={{
          display: "flex",
          paddingBottom: "20px",
          justifyContent: "center",
        }}
      >
        <button className="button" onClick={handleSelectAll}>
          すべて
        </button>
        <button className="button" onClick={handleSelectNotDoneOnly}>
          未完了
        </button>
        <button className="button" onClick={handleSelectDoneOnly}>
          完了済み
        </button>
      </div>
      {items.map(item => (
          <TodoItem
        key={item.key}
        text = {item.text}
            done = {item.done}
            handleChangeDone={()=>handleChangeDone(item.key)}
        />
      )
                )}
      <div className="panel-block">
        {items.length} items
      </div>
       <div className="panel-block">
        <button className="button is-light is-fullwidth" onClick={clearItems}>
          全てのToDoを削除
        </button>
      </div>
    </div>
  );
}

export default Todo;