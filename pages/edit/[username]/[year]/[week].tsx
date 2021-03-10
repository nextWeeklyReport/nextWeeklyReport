// import { User } from '../interfaces'
import Layout from "../../../../components/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getformto } from "../../../../utils/week";
import Editor from "rich-markdown-editor";
import Btn from "../../../../components/Btn";
const WeeklyRePort = () => {
  const router = useRouter();
  const { username, year, week } = router.query;
  const [md, setMD] = useState("");
  const [weeks, setWeeks] = useState<any>({});
  const [text, setText] = useState("");
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  const get = async () => {
    console.log(username, year, week);
    if (username && year && week) {
      const rawResponse = await fetch(`/api/report`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, year, week }),
      });
      const json = await rawResponse.json();
      const { text } = json;
      if (text) {
        setMD(text);
      } else {
        setIsEmpty(true);
        console.log("null");
      }
    }
  };
  const save = async () => {
    console.log(text);
    const rawResponse = await fetch(`/api/report`, {
      method: "PUT",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, year, week, text }),
    });
    if (rawResponse.ok) {
      const json = await rawResponse.json();
      const { matchedCount, modifiedCount, upsertedCount } = json;
      if (matchedCount + modifiedCount + upsertedCount >= 0) {
        console.log("ok");
        router.push(`/${username}/${year}/${week}`);
      } else {
        console.log("err");
      }
    } else {
      const err = await rawResponse.text();
      console.log(err);
    }
  };

  useEffect(() => {
    get();
    const { from, to } = getformto(parseInt(year + ""), parseInt(week + ""));
    setWeeks({ from, to });
  }, [username, year, week]);

  return (
    <Layout
      title={username ? username as string : ""}
    >
      <h1>{username}</h1>
      <h2>{year}年 第 {week} 周</h2>
      <p>{weeks?.from?.m}月{weeks?.from?.d}日 ~ {weeks?.to?.m}月{weeks?.to?.d}日</p>
      <Editor
        value={md}
        autoFocus={true}
        onChange={(value: any) => {
          setText(value);
        }}
      />
      <Btn onClick={save}>{isEmpty ? "POST" : "SAVE"}</Btn>
    </Layout>
  );
};

export default WeeklyRePort;
