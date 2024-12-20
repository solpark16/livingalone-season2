import { GroupApplication } from "@/types/types";

interface ApplyCardProps {
  applications: GroupApplication[];
}
function ApplyCard({ applications }: ApplyCardProps) {
  return (
    <>
      {applications.length > 0 ? (
        <>
          <ul>
            {applications.map((application, index) => (
              <li
                key={application.id}
                className="flex justify-between items-center border border-gray-3 py-4 px-5 rounded-lg"
              >
                <div className="flex justify-between flex-1 flex-col md:flex-row">
                  <div className="flex justify-start gap-3">
                    <div>{index + 1}.</div>
                    <div className="shrink-0">{application.user_name}</div>
                  </div>
                  <div className="shrink-0">{application.user_phone}</div>
                  <div className="shrink-0">{application.user_address}</div>
                </div>
                <div className="flex flex-1 items-end justify-end">
                  {application.is_paid ? "입금완료" : "미입금"}
                </div>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <div className="flex justify-center items-center border border-gray-3 py-4 px-5 rounded-lg">
          아직 신청자가 없습니다.
        </div>
      )}
    </>
  );
}

export default ApplyCard;
