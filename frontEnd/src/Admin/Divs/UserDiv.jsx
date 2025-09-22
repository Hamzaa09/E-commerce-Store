import { useDispatch, useSelector } from "react-redux";
import { getAllUsersThunk } from "../../../store/users/user.thunk";
import { useEffect } from "react";
import { useState } from "react";

const UserDiv = ({ value }) => {
  const dispatch = useDispatch();
  const { allUsers } = useSelector((state) => state.userSlice);
  const [User, setUser] = useState();
  
  useEffect(() => {
    dispatch(getAllUsersThunk());
  }, [dispatch]);
  
  useEffect(() => {
    if (value) {
      setUser(
        allUsers.filter(
          (user) =>
            user.userName?.toLowerCase().includes(value.toLowerCase()) ||
            user.address?.toLowerCase().includes(value.toLowerCase()) ||
            user.country?.toLowerCase().includes(value.toLowerCase())
        )
      );
    } else {
      setUser(allUsers);
    }
  }, [value, allUsers]);

  return (
    <>
      {/* table */}
      <div className="w-full overflow-scroll">
        <div
          className={`bg-white min-w-[800px] h-[81vh] md:w-full border border-GrayLight rounded-lg overflow-y-scroll transition-all duration-1000 ease-in-out`}
        >
          <table className="h-fit w-full group">
            <thead>
              <tr
                className={`w-full sticky top-0 bg-white group-hover:shadow-sm [&>th]:text-start [&>th]:pl-5 [&>th]:py-4 [&>th]:text-xl [&>th]:font-semibold mb-5`}
              >
                <th className="w-[10%] md:w-[9%]">S no.</th>
                <th>User</th>
                <th>Country</th>
                <th>Contact</th>
                <th>Address</th>
              </tr>
            </thead>

            <tbody>
              {!User && (
                <tr>
                  <td colSpan={6}>
                    <span className="mainHeading flex flex-col justify-start items-start md:justify-center md:items-center mb-15 tracking-wide px-5 mt-5 md:px-10 lg:mt-10 2xl:w-[1500px] 2xl:mx-auto">
                      <h1 className="py-3 text-center text-2xl md:text-4xl font-bold">
                        No User!
                      </h1>
                      <span className="bg-Red w-[100px] lg:w-[10%] h-1"></span>
                    </span>
                  </td>
                </tr>
              )}

              {User?.map((user, index) => (
                <tr
                  key={index}
                  className="[&>td]:text-start [&>td]:px-4 [&>td]:py-2 [&>td]:text-base border border-transparent border-b-GrayLight border-t-GrayLight last:border-b-transparent hover:bg-WhiteLight hover:cursor-pointer"
                >
                  <td>{index + 1}</td>
                  <td className="flex justify-start items-center gap-3 h-full mr-5">
                    <img
                      className="w-9 h-9 rounded-full"
                      src="/ProfilePhoto.jpeg"
                      alt="Rounded avatar"
                    />
                    <p>{user.userName || "N/A"}</p>
                  </td>
                  <td>{user.country || "N/A"}</td>
                  <td>{user.number || "N/A"}</td>
                  <td>{user.address || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default UserDiv;
