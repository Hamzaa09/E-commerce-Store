import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { getInquiryThunk } from "../../../store/inquiry/inquiry.thunk";

const Inquirydiv = ({value}) => {
  const dispatch = useDispatch();
  const { allInq } = useSelector((state) => state.inquirySlice);
  const [Inquiry, setInquiry] = useState();

  useEffect(() => {
    const response = dispatch(getInquiryThunk());
  }, [dispatch]);

  useEffect(() => {
    if (value) {
      setInquiry(
        allInq.filter(
          (inq) =>
            inq.inqEmail?.toLowerCase().includes(value.toLowerCase()) ||
            inq.inqNumber?.toLowerCase().includes(value.toLowerCase()) ||
            inq.inqText?.toLowerCase().includes(value.toLowerCase())
        )
      );
    } else {
      setInquiry(allInq);
    }
  }, [value, allInq]);

  return (
    <>
      {/* table */}
      <div className="w-full overflow-auto">
        <div
          className={`bg-white min-w-[800px] h-[81vh] md:w-full border border-GrayLight rounded-lg  overflow-y-scroll transition-all duration-1000 ease-in-out`}
        >
          <table className="h-fit w-full group">
            <thead>
              <tr
                className={`w-full sticky top-0 bg-white group-hover:shadow-sm [&>th]:text-start [&>th]:pl-5 [&>th]:py-4 [&>th]:text-xl [&>th]:font-semibold mb-5`}
              >
                <th className="w-[10%] sm:w-fit">S no.</th>
                <th>Details</th>
                <th>Inquiry</th>
              </tr>
            </thead>

            <tbody>
              {Inquiry?.length ? (
                Inquiry?.map((inq, index) => (
                  <tr
                    key={index}
                    className="[&>td]:text-start [&>td]:text-base [&>td]:px-4 [&>td]:py-2 border border-transparent border-b-GrayLight border-t-GrayLight last:border-b-transparent hover:bg-WhiteLight hover:cursor-pointer"
                  >
                    <td>{index + 1}</td>
                    <td className="flex flex-col justify-start items-start gap-3 h-full">
                      <span>
                        <strong>Email: </strong> {inq.inqEmail}
                      </span>
                      <span>
                        <strong>Number: </strong> {inq.inqNumber}
                      </span>
                    </td>
                    <td className="max-w-100">{inq.inqText}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="mainHeading flex flex-col justify-start items-start md:justify-center md:items-center mb-15 tracking-wide px-5 mt-5 md:px-10 lg:mt-10 2xl:w-[1500px] 2xl:mx-auto"
                  >
                    <h1 className="py-3 text-center text-2xl md:text-3xl font-bold">
                      No Inquiries
                    </h1>
                    <span className="bg-Red w-[100px] lg:w-[10%] h-1"></span>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Inquirydiv;
