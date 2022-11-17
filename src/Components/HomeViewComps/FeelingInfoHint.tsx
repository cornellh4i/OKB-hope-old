import React from "react";
import { Feeling } from "../../Views/HomeView";
import { PortableText } from "@portabletext/react";

type Props = {
  feeling: Feeling | null | undefined;
};
const FeelingInfoHint: React.FC<Props> = ({ feeling }) => {
  return (
    <div
      className={"p-4 mb-4 md:mb-6 bg-light-blue rounded-md mt-[20px] md:mt-0"}
    >
      <span
        style={{ fontFamily: "Futura PT Cond", lineHeight: "23px" }}
        className={"text-left text-black text-[18px] font-bold"}
      >
        {feeling?.title}
      </span>
      {feeling && <PortableText value={feeling.body} />}
    </div>
  );
};

export default FeelingInfoHint;
