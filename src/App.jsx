// App.jsx

import React from 'react';

function App() {
  return (
    <div className="App">
      <h1>ログイン</h1>
      <form>
        <div>
          <label htmlFor="email">メールアドレス</label>
          <input id="email" type="email" />
        </div>
        <div>
          <label htmlFor="password">パスワード</label>
          <input id="password" type="password" />
        </div>
        <button type="submit">ログイン</button>
      </form>
    </div>
  );
}

export default App;
