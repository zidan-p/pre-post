import { IGeneralPresenterMapper, IPresenterMapper } from "~/common/core/mapper";
import { IPaginateReponse } from "~/common/types/paginate";


export interface ExpressPaginateWithUrlRaw {
  page: number;
  dataPerPage: number;
  dataTotal: number;
  pageTotal: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  nextPage: string | null;
  previousPage: string | null;
}


export class ExpressPaginateWithUrlMap implements IGeneralPresenterMapper<IPaginateReponse, ExpressPaginateWithUrlRaw>{

  constructor(
    private readonly URL: URL
  ){}

  toPresentation(args: IPaginateReponse): ExpressPaginateWithUrlRaw{

    let nextPage: string | null = null;
    if(args.hasNextPage) nextPage = this.URL.pathname + "/" + String(args.page + 1);

    let previousPage: string | null = null;
    if(args.hasNextPage) previousPage = this.URL.pathname + "/" + String(args.page - 1);

    return {
      ...args, nextPage, previousPage
    }
  };

}