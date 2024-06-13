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

  private readonly URL: URL;

  constructor(
    URL: URL
  ){
    URL.pathname = "/posts";
    this.URL = URL;
  }

  /**
   * @todo simplify the URL building, i dont think it's better to make complicated object creation just to make a string
   * @param args 
   * @returns 
   */
  toPresentation(args: IPaginateReponse): ExpressPaginateWithUrlRaw{

    let nextPage: string | null = null;
    if(args.hasNextPage){ 
      const nextPageURL = new URL(this.URL);

      const nextParam = "/" + String(args.page + 1)
      const searchParam = new URLSearchParams();
      if(args.dataPerPage) searchParam.append("dataPerPage", String(args.dataPerPage));
      if(args.page) searchParam.append("page", String(args.page));
      nextPageURL.search = searchParam.toString();
      nextPageURL.pathname = nextPageURL.pathname + nextParam;
      nextPage = nextPageURL.toString();
    };

    let previousPage: string | null = null;
    if(args.hasPreviousPage) {
    
      const previousPageURL = new URL(this.URL);

      const previousParam = "/" + String(args.page - 1)
      const searchParam = new URLSearchParams();
      if(args.dataPerPage) searchParam.append("dataPerPage", String(args.dataPerPage));
      if(args.page) searchParam.append("page", String(args.page));
      previousPageURL.search = searchParam.toString();
      previousPageURL.pathname = previousPageURL.pathname + previousParam;
      previousPage = previousPageURL.toString();
    }

    return {
      ...args, nextPage, previousPage
    }
  };

}