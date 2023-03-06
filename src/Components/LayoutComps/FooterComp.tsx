import React from "react";
import { Link } from "react-router-dom";

const FooterComp = () => {
  const linkClasses = `text-white no-underline text-sm hover:bg-white hover:text-blue focus:border-[#5DADEC] focus:border`;
  const linkStyles = { fontFamily: "Roboto", fontWeight: "400" };
  return (
    <div
      className={
        "grid grid-cols-2 gap-2 w-full bg-blue text-white py-6 px-3 max-w-screen-xl mx-auto "
      }
    >
      <div className={"flex flex-col gap-2 "}>
        <div>
          <Link className={linkClasses} style={linkStyles} to={"/about-us"}>
            About us
          </Link>
        </div>
        <div aria-label="Wohohiame's Email">
          <a
            href="mailto:wohohiame@okbfoundation.org"
            className={linkClasses}
            style={linkStyles}
          >
            wohohiame@okbfoundation.org
          </a>
        </div>
      </div>

      <div
        className={
          "flex flex-col gap-2 lg:gap-4  text-sm font-bold items-end text-end"
        }
      >
        <span className={linkClasses} style={linkStyles}>
          Follow us on social media
        </span>
        <div className={"flex gap-4"}>
          <span>
            <button aria-label="Wohohiame’s Instagram page">
              <a
                style={{ color: "white" }}
                href="https://www.instagram.com/wohohiame/"
                target="_blank"
              >
                <svg
                  width="31"
                  height="30"
                  viewBox="0 0 31 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.3718 22.7061C11.0159 22.7061 7.47266 19.2485 7.47266 15C7.47266 10.7514 11.0159 7.29187 15.3718 7.29187C19.7276 7.29187 23.2689 10.7495 23.2689 15C23.2689 19.2504 19.7256 22.7061 15.3718 22.7061ZM15.3718 9.85794C12.4672 9.85794 10.1023 12.1637 10.1023 15C10.1023 17.8362 12.4652 20.142 15.3718 20.142C18.2784 20.142 20.6412 17.8362 20.6412 15C20.6412 12.1637 18.2784 9.85794 15.3718 9.85794Z"
                    fill="white"
                  />
                  <path
                    d="M22.717 30H8.02444C3.59988 30 0 26.4872 0 22.1677V7.83037C0 3.51282 3.59988 0 8.02444 0H22.717C27.1416 0 30.7415 3.51282 30.7415 7.83037V22.1677C30.7415 26.4852 27.1416 29.998 22.717 29.998V30ZM8.02444 2.56607C5.04913 2.56607 2.62765 4.92899 2.62765 7.83235V22.1677C2.62765 25.071 5.04913 27.4339 8.02444 27.4339H22.717C25.6924 27.4339 28.1138 25.071 28.1138 22.1677V7.83037C28.1138 4.92702 25.6924 2.5641 22.717 2.5641H8.02444V2.56607Z"
                    fill="white"
                  />
                </svg>
              </a>
            </button>
          </span>
          <span>
            <button aria-label="Wohohiame’s Facebook page">
              <a
                style={{ color: "white" }}
                href="https://www.facebook.com/profile.php?id=100086186303060"
                target="_blank"
              >
                <svg
                  width="17"
                  height="30"
                  viewBox="0 0 17 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.25 5.29226V0H11.5425C7.80945 0 4.78291 3.00809 4.78291 6.71839V11.5609H0V17.0859H4.78291V30H10.6236V17.0011H14.9977L15.8312 11.5156H10.6236V7.61194C10.6236 6.33178 11.6675 5.29423 12.9555 5.29423H16.25V5.29226Z"
                    fill="white"
                  />
                </svg>
              </a>
            </button>
          </span>
          <span>
            <button aria-label="Wohohiame’s Twitter page">
              {/*              <svg width="43" height="31" viewBox="0 0 43 31" fill="none" xmlns="http://www.w3.org/2000/svg">*/}
              {/*<path d="M33.292 0.331543H9.6076C4.30147 0.331543 0 4.52899 0 9.7068V20.9563C0 26.1341 4.30147 30.3315 9.6076 30.3315H33.292C38.5981 30.3315 42.8996 26.1341 42.8996 20.9563V9.7068C42.8996 4.52899 38.5981 0.331543 33.292 0.331543Z" fill="white"/>*/}
              {/*<path d="M28.5734 15.3317L22.7593 18.7678L16.9453 22.2039V15.3317V8.45947L22.7593 11.8956L28.5734 15.3317Z" fill="#2469A6"/>*/}
              {/*</svg>*/}
              <a
                style={{ color: "white" }}
                href="https://twitter.com/wohohiame"
                target="_blank"
              >
                <svg
                  width="38"
                  height="30"
                  viewBox="0 0 38 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M37.2268 3.96057C36.4497 5.04539 35.5957 6.02369 34.6075 6.92507C33.5464 7.88957 33.7337 8.54834 33.6292 9.8659C33.4734 11.8481 33.0651 13.7633 32.4162 15.643C31.142 19.3373 28.8422 22.6174 25.8777 25.146C18.7673 31.2071 7.80079 31.4655 0 26.6332C5.74359 26.8777 8.31953 25.6963 11.3097 23.4852C8.30572 23.0533 5.60947 22.2485 4.13412 18.1263C5.57594 18.5207 6.60749 18.3294 7.49112 18.0829C4.71992 17.2032 1.46548 15.86 1.46548 10.5306C2.64103 11.2367 4.22682 11.5405 4.91716 11.4438C1.18146 8.84815 0.877712 4.51284 2.57791 1.2801C4.98028 4.86393 13.8521 9.88957 17.8895 9.00397C17.4418 5.37872 19.3925 1.70811 22.9862 0.483256C25.0138 -0.205107 27.0237 -0.15777 29.0197 0.623295C29.7968 0.930987 30.5819 1.43592 31.1795 2.02566C31.2821 2.12625 31.3511 2.2012 31.4891 2.23079C31.5759 2.25051 31.6667 2.24065 31.7515 2.21698C33.1479 1.82251 35.3353 0.861954 35.9467 0.514814C36.1874 0.378719 34.7101 3.88957 32.6923 4.74361C33.5976 4.53848 35.7357 3.89154 36.6114 3.5227C36.783 3.44973 36.9823 3.40436 37.1223 3.45564C37.3235 3.51679 37.4103 3.71205 37.2268 3.9586V3.96057Z"
                    fill="currentColor"
                  />
                </svg>
              </a>
            </button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default FooterComp;
