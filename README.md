<h1>1.ポートフォリオ紹介</h1>


SNSで頻繁に使用される機能を詰め込んだSPAでの投稿アプリ<br/>
URL: https://react-typescript-express-sns-app.netlify.app<br>
REST APIレポジトリ：　https://github.com/Naoshin-hirano/fullstack-node-react-api



<h4>◆トップページ</h4>

<img width="1025" alt="スクリーンショット 2022-12-17 16 14 54" src="https://user-images.githubusercontent.com/59371503/208230488-ce52b11e-a0bb-4c9e-a96a-8da75bf02be5.png">




<h4>◆レスポンシブデザイン</h1>

![レスポンシブ](https://user-images.githubusercontent.com/59371503/208230029-db056d1d-808f-4bbe-9eff-132a4f616efb.gif)




<h1>2.使用技術</h1>

| 使用箇所 | 使用技術名 |
|:---|:---|
|フロント|React18.2.0, Typescript4.8.2|
|REST API|Node.js(Express4.18.1)|
|データベース|MySQL2.3.3|
|アップロードした画像の格納先|Cloudinary1.32.0|
|デプロイ先・独自ドメインの接続|Netlify(フロント), Heroku(バックエンド)|
|ソース管理|Git／GitHub|






<h1>3.ER図</h1>

![95638CC6-658A-46F5-89E0-4A0A1524878E](https://user-images.githubusercontent.com/59371503/204472063-0ac3fa9c-2da3-4e42-acef-0855ef24101b.png)



<h1>4.工夫点</h1>

<h2>■グローバルな状態管理をReduxでなくuseContextを使用</h2>
　・アプリが小規模でGlobal Stateに持たせたい値が少ないため</br>
　・Reduxと比較して書くべきコード量が少なかったりライブラリ導入の必要がない、仕組みがシンプルなので工数を抑えれる
 
<h2>■ダイレクトメッセージにswrを使用</h2>
　・リアルタイム性の高いデータをポーリングして再取得できるため
 
<h2>■Atomic Designでのコンポーネント設計</h2>
 ・UIコンポーネントの粒度をカテゴリーに明確に分けることで可読性を上げる</br>
 ・ComponentsをuseContextやAPIに依存しないようにしているので、汎用性や再利用性を高める




<h1>5.実装機能まとめ</h1>

| 実装機能 | 説明 |
|:---|:---|
|CRUD機能|基本機能である　Create（生成）、Read（読み取り）、Update（更新）、Delete（削除）|
|認証機能|bcryptとJWTを使用したサインアップ/ログイン/ログアウト機能です|
|いいね|お気に入りの投稿にいいね登録と解除ができる|
|コメント|各投稿におけるコメントの追加と削除|
|タグ機能|投稿時にタグの新規作成と既存タグつけが可能。また、投稿のタグクリックでそのタグに紐づく投稿一覧表示|
|ページネーション|1ページ3投稿表示のページネーション|
|オートサジェスチョン|検索欄での文字入力からオートで検索候補が表示。またその検索候補クリックでヒットする投稿一覧表示|
|ダイレクトメッセージ|プロフィール画面でのユーザーとのダイレクトメッセージ機能|
|フォローフォロワー|ユーザーをフォローしたり解除ができる|
|画像アップロード|投稿時にCloudinaryを使用して画像アップロードができる|
|プロフィール|投稿のユーザークリックにてユーザープロフィール表示。ログインパスワードやアバター変更も可能|
<p>※機能ロジック詳細表：　https://docs.google.com/spreadsheets/d/1wj0_xWsnIVNB5oixF4e3sRZD5npnnelTATrJVFkqPNc/edit#gid=0</p>



<h1>6.　機能一覧</h1>

<h2>■いいね！</h2>
お気に入りの投稿にいいね登録と解除ができる。

![タイトルなし](https://user-images.githubusercontent.com/59371503/204788001-0c4e0993-b3ec-48bf-82b7-8cb2dc467ce6.gif)



<h2>■コメント</h2>
投稿詳細画面にてその投稿に対してコメントの追加と削除ができます

![コメント](https://user-images.githubusercontent.com/59371503/205067278-52522455-ded0-44b8-9a99-859acbbe978b.gif)



<h2>■タグ</h2>
投稿時にタグの新規作成と既存タグつけが可能。また、投稿のタグクリックでそのタグに紐づく投稿一覧表示

![タグポスト](https://user-images.githubusercontent.com/59371503/205067525-cbd7c848-c6c7-4617-810a-b95a2ac898cf.gif)



<h2>■ページネーション</h2>
1ページ3投稿表示のページネーション

![ページネーション](https://user-images.githubusercontent.com/59371503/205067543-c99f7b84-d32a-42dd-8c6c-9c5e7ff093a5.gif)



<h2>■オートサジェスチョン</h2>
検索欄での文字入力にてリアルタイムで検索候補が表示。またその検索候補クリックで「タイトル」「投稿内容」「投稿ユーザー名」にヒットする投稿一覧表示。</br>


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


