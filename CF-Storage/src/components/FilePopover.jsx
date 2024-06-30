import * as React from "react";

function MyComponent() {
  return (
    <>
      <div className="div">
        <div className="div-2">App School.fig</div>
        <div className="div-3">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/926dadbb5b1c4a288e0397f6c28706a6960c00a13627f11245f7c44d6b11b7f0?"
            className="img"
          />
          <div className="div-4">Share</div>
        </div>
        <div className="div-5">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/54a084866dca98a8c1c2265b001eadbb6bcea86e97014eeefe0bf1a7cfdba48a?"
            className="img-2"
          />
          <div className="div-6">Download</div>
        </div>
        {/* <div className="div-7">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/6d311441253fbf2162f3422e3b389a624496183f15680abdea9bc28d3ce29cf6?"
            className="img"
          />
          <div className="div-8">Delete</div>
        </div> */}
      </div>
      <style jsx>{`
        .div {
          position: absolute;
          border-radius: 20px;
          box-shadow: 0px 30px 40px 0px rgba(89, 104, 178, 0.06),
            0px 0px 30px 0px rgba(89, 104, 178, 0.06);
          background-color: var(--Default-White, #fff);
          display: flex;
          max-width: 347px;
          flex-direction: column;
          font-size: 14px;
          color: var(--Text-Light-01, #333f4e);
          font-weight: 400;
          line-height: 143%;
          padding: 14px 26px 77px;
        }
        .div-2 {
          font-feature-settings: "clig" off, "liga" off;
          font: 600 20px/130% Poppins, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        .div-3 {
          border-color: rgba(163, 178, 199, 1);
          border-style: solid;
          border-bottom-width: 0px;
          display: flex;
          margin-top: 10px;
          gap: 12px;
          white-space: nowrap;
          padding: 10px 0;
        }
        .img {
          aspect-ratio: 1;
          object-fit: auto;
          object-position: center;
          width: 30px;
        }
        .div-4 {
          font-feature-settings: "clig" off, "liga" off;
          font-family: Poppins, sans-serif;
          margin: auto 0;
        }
        .div-5 {
          border-color: rgba(163, 178, 199, 1);
          border-style: solid;
          border-bottom-width: 0px;
          display: flex;
          padding-top: 10px;
          gap: 12px;
          white-space: nowrap;
        }
        .img-2 {
          aspect-ratio: 1.3;
          object-fit: auto;
          object-position: center;
          width: 30px;
          align-self: start;
        }
        .div-6 {
          font-feature-settings: "clig" off, "liga" off;
          font-family: Poppins, sans-serif;
        }
      `}</style>
    </>
  );
}

export default MyComponent;
