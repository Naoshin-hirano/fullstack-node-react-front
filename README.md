<h1>1.ポートフォリオ紹介</h1>


SNSで頻繁に使用される機能を詰め込んだ投稿アプリ<br/>
URL: https://iridescent-pasca-92f793.netlify.app/
REST API：　https://github.com/Naoshin-hirano/fullstack-node-react-api



<h4>◆トップページ</h4>



<h1>2.使用技術</h1>

| 使用箇所 | 使用技術名 |
|:---|:---|
|フロント|React18.2.0|
|REST API|Node.js(Express4.18.1)|
|データベース|MySQL2.3.3|
|アップロードした画像の格納先|Cloudinary1.32.0|
|デプロイ先・独自ドメインの接続|Netlify(フロント), Heroku(バックエンド)|
|ソース管理|Git／GitHub|



<h1>3.全体構成図</h1>
（説明）




<h1>4.ER図</h1>

![95638CC6-658A-46F5-89E0-4A0A1524878E](https://user-images.githubusercontent.com/59371503/204472063-0ac3fa9c-2da3-4e42-acef-0855ef24101b.png)



<h1>5.工夫点</h1>

①<h2>グローバルな状態管理をstoreでなくuseContextを使用</h2>
　・小規模でglobal stateに持たせたい値が少ないため</br>
　・コード量が少なかったりやライブラリ導入の必要がないので工数がかからない
 
②<h2>ダイレクトメッセージにswrを使用</h2>
③<h2>Atomic Designでのコンポーネント設計</h2>



<h1>6.難しかったところ</h1>




<h1>7.実装機能まとめ</h1>

| 実装機能 | 説明 |
|:---|:---|
|CRUD機能|基本機能である　Create（生成）、Read（読み取り）、Update（更新）、Delete（削除）|
|いいね|お気に入りの投稿にいいね登録と解除ができる|
|コメント|各投稿におけるコメントの追加と削除|
|タグ機能|投稿時にタグの新規作成と既存タグつけが可能。また、投稿のタグクリックでそのタグに紐づく投稿一覧表示|
|ページネーション|1ページ3投稿表示のページネーション|
|オートサジェスチョン|検索欄での文字入力からオートで検索候補が表示。またその検索候補クリックでヒットする投稿一覧表示|
|ダイレクトメッセージ|プロフィール画面でのユーザーとのダイレクトメッセージ機能|
|フォローフォロワー|ユーザーをフォローしたり解除ができる|
|画像アップロード|投稿時に画像アップロードできる|
|プロフィール|投稿のユーザークリックにてユーザープロフィール表示。ログインパスワードやアバター変更も可能|




<h1>8.　機能一覧</h1>

<h2>■投稿のCRUD</h2>
基本機能である　Create（生成）、Read（読み取り）、Update（更新）、Delete（削除）



<h2>■いいね！</h2>
お気に入りの投稿にいいね登録と解除ができる。

![タイトルなし](https://user-images.githubusercontent.com/59371503/204788001-0c4e0993-b3ec-48bf-82b7-8cb2dc467ce6.gif)



<h2>■コメント</h2>
詳細画面下部の「参加する」ボタンからその英会話教室へ参加登録ができます。左側の「出席者PickUp」に参加予定者一覧が表示されています。

![コメント](https://user-images.githubusercontent.com/59371503/205067278-52522455-ded0-44b8-9a99-859acbbe978b.gif)



<h2>■タグ</h2>
投稿時にタグの新規作成と既存タグつけが可能。また、投稿のタグクリックでそのタグに紐づく投稿一覧表示

![タグポスト](https://user-images.githubusercontent.com/59371503/205067525-cbd7c848-c6c7-4617-810a-b95a2ac898cf.gif)



<h2>■ページネーション</h2>
1ページ3投稿表示のページネーション

![ページネーション](https://user-images.githubusercontent.com/59371503/205067543-c99f7b84-d32a-42dd-8c6c-9c5e7ff093a5.gif)



<h2>■オートサジェスチョン</h2>
検索欄での文字入力からオートで検索候補が表示。またその検索候補クリックでヒットする投稿一覧表示

![オートサジェスチョン](https://user-images.githubusercontent.com/59371503/205169358-e7108f96-8674-49f9-a20b-5e09dcc46c9d.gif)



<h2>■ダイレクトメッセージ</h2>
2者間のダイレクトメッセージをリアルタイムで送信と反映します

![ダイレクトメッセージ](https://user-images.githubusercontent.com/59371503/205169329-0f0e54f6-b14b-4d00-b580-84763b1fcaee.gif)



<h2>■フォローフォロワー</h2>
ユーザーをフォローしたり解除ができる

![フォローフォロワー](https://user-images.githubusercontent.com/59371503/205067603-18ea2b3b-e789-4a77-b76a-44d473eba335.gif)



<h2>■画像アップロード</h2>
投稿時やユーザーアカウントのアバターに画像アップロードできる

![画像アップロード](https://user-images.githubusercontent.com/59371503/205068753-933473ff-05e2-47d3-9293-d30bf742c4a4.gif)



<h2>■プロフィール</h2>
投稿のユーザー名クリックにてユーザープロフィール表示。ログインパスワードやアバター変更も可能

![プロフィール編集](https://user-images.githubusercontent.com/59371503/205067667-c8cb6af9-0521-45ed-91e5-702daa78bd5a.gif)


