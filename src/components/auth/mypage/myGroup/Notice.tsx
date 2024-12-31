function Notice() {
  return (
    <p className="border border-red-6 rounded-lg text-[13px] md:text-[16px] md:w-[800px] mx-auto p-[30px] text-gray-6 leading-relaxed">
      안녕하세요, 혼자살때 공구 게시판을 이용해주셔서 감사합니다.
      <br />
      공구 진행 시 꼭 참고해 주세요.
      <ul className="list-disc my-[30px] ml-2 md:ml-[30px] flex flex-col gap-2">
        <li>
          혼자살때에서는&nbsp;
          <span className="font-bold text-red-6">
            공동 구매(공구) 결제가 이루어지지 않습니다.&nbsp;
          </span>
          저희는 공구를 할 수 있는 게시판만 제공해 드립니다.
        </li>
        <li>
          공구자는 공구를 열고 신청자를 받아&nbsp;
          <span className="font-bold text-red-6">
            이후 과정을 직접 진행해 주셔야 합니다.
          </span>
        </li>
        <li>
          혼자살때에서는&nbsp;
          <span className="font-bold text-red-6">
            공구 진행과 관련된 책임을 지지 않습니다.
          </span>
        </li>
        <li>
          공구자는 신청자의&nbsp;
          <span className="font-bold text-red-6">
            개인정보를 물건 발송 이후 즉시 모두 삭제
          </span>
          해 주시기 바랍니다.
        </li>
      </ul>
      위 내용을 잘 숙지하시어 원활한 공구 진행을 부탁드립니다. <br />
      감사합니다.
    </p>
  );
}

export default Notice;
