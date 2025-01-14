import Page from "@/components/common/page/Page";
import PageTitle from "@/components/common/page/PageTitle";
import PaymentMain from "@/components/payment/PaymentMain";
import GroupSearchResult from "@/components/search/group/GroupSearchResult";
import MustSearchResult from "@/components/search/must/MustSearchResult";

function SearchPage({ searchParams }: { searchParams: { search: string } }) {
  return (
    <Page>
      <h3 className="text-[20px] md:text-[32px] font-[700] items-center text-gray-6 flex flex-col gap-[2px] mb-[90px]">
        <span className="text-main-6">“{searchParams.search}”</span>
        검색결과
      </h3>
      <GroupSearchResult searchValue={searchParams.search} />
      <MustSearchResult searchValue={searchParams.search} />
    </Page>
  );
}

export default SearchPage;
