import { 
  CreateParams, DataProvider, DeleteManyParams, DeleteManyResult, DeleteParams, 
  DeleteResult, GetListParams, GetManyParams, GetManyReferenceParams, GetManyReferenceResult, 
  GetManyResult, GetOneParams, GetOneResult, Identifier, RaRecord, UpdateManyParams, 
  UpdateManyResult, UpdateParams, UpdateResult, fetchUtils 
} from "react-admin";
import { FilterType, RemoteQueryFilter } from "../types/filter.type";
import { convertToArrayNotation } from "../utils/object";
import queryString from "query-string";
import { convertObjectToFormData } from "./utils";



const httpClient = fetchUtils.fetchJson;

export class BasePrepostDataProvider implements DataProvider {
  private readonly url: string

  constructor(url: string){ this.url = url }

  async getList(resource: string, params: GetListParams){
    const {page, perPage} = params.pagination;
    const {field, order} = params.sort;
    const filter = params.filter as Partial<FilterType>;

    const RemoteQuery: Partial<RemoteQueryFilter<any>> = {
      dataPerPage: perPage,
      page,
      orderBy: [[field, order]],
      where: filter?.where,
      whereExcluded: filter?.whereExcluded,
      whereIncluded: filter?.whereIncluded
    }


    const converted = convertToArrayNotation(RemoteQuery);

    const url = queryString.stringifyUrl({url: this.url + "/" + resource, query: converted});

    const result =  (await httpClient(url, {method: "GET"}));
    const returnResult = result.json
    return {
      data: returnResult.data,
      total: returnResult?.pagination?.dataTotal,
      pageInfo: returnResult?.pagination
    };

  }

  async getOne<RecordType extends RaRecord<Identifier> = any>(
    resource: string, 
    params: GetOneParams<RecordType>
  ): Promise<GetOneResult<RecordType>>{
    const id = params.id;

    const url = this.url + "/" + resource + "/" + id;
    const result =  (await httpClient(url, {method: "GET"}));
    const data = result.json
    return data;
  };

  async getMany<RecordType extends RaRecord<Identifier> = any>(
    resource: string, 
    params: GetManyParams
  ): Promise<GetManyResult<RecordType>>{
    const singularResource = resource.slice(0, resource.length - 2); //strip the s
    const manyIds = {
      [singularResource + "Ids"]: params.ids
    };

    const converted = convertToArrayNotation(manyIds);
    
    const url = queryString.stringifyUrl({url: this.url + "/" + resource, query: converted});

    const result =  (await httpClient(url, {method: "GET"}));
    const data = result.json
    return data;
  };

  async getManyReference<RecordType extends RaRecord<Identifier> = any>(
    resource: string, 
    params: GetManyReferenceParams
  ) : Promise<GetManyReferenceResult<RecordType>>{
    const {page, perPage} = params.pagination;
    const {field, order} = params.sort;
    const filter = params.filter as Partial<FilterType>;

    const target = {[params.target] : params.id}

    const RemoteQuery: Partial<RemoteQueryFilter<any>> = {
      dataPerPage: perPage,
      page,
      orderBy: [[field, order]],
      where: target,
      whereExcluded: filter?.whereExcluded,
      whereIncluded: filter?.whereIncluded
    }


    const converted = convertToArrayNotation(RemoteQuery);

    const url = queryString.stringifyUrl({url: this.url + "/" + resource, query: converted});

    const result =  (await httpClient(url, {method: "GET"}));
    const data = result.json
    return data;
  }

  async update<RecordType extends RaRecord<Identifier> = any>(
    resource: string, 
    params: UpdateParams<any>
  ):  Promise<UpdateResult<RecordType>>{
    const id = params.id;

    let body: any;
    if(params.meta?.isFormdata) body = convertObjectToFormData(params.data);
    else body = JSON.stringify(params.data);

    const url = this.url + "/" + resource + "/" + id;
    const result =  (await httpClient(url, {method: "PUT", body: body}));
    const data = result.json
    return data;
  }

  async updateMany<RecordType extends RaRecord<Identifier> = any>(
    resource: string, 
    params: UpdateManyParams<any>
  ) :Promise<UpdateManyResult<RecordType>>{
    const singularResource = resource.slice(0, resource.length - 2); //strip the s
    const manyIds = {
      [singularResource + "Ids"]: params.ids
    };

    let body: any;
    if(params.meta?.isFormdata) body = convertObjectToFormData(params.data);
    else body = JSON.stringify(params.data);

    const converted = convertToArrayNotation(manyIds);
    
    const url = queryString.stringifyUrl({url: this.url + "/" + resource, query: converted});

    const result =  (await httpClient(url, {method: "PUT", body}));
    const data = result.json
    return data;
  };

  async create<
    RecordType extends Omit<RaRecord<Identifier>, "id"> = any, 
    ResultRecordType extends RaRecord<Identifier> & {data: any} = RecordType & {data: any, id: string}
  >(
    resource: string, 
    params: CreateParams<RecordType>
  ):Promise<ResultRecordType>{

    let body: any;
    if(params.meta?.isFormdata) body = convertObjectToFormData(params.data);
    else body = JSON.stringify(params.data);

    const url = this.url + "/" + resource;
    const result =  (await httpClient(url, {method: "POST", body}));
    const data = result.json;
    return data;
  };

  async delete<RecordType extends RaRecord<Identifier> = any>(
    resource: string, 
    params: DeleteParams<RecordType>
  ) : Promise<DeleteResult<RecordType>>{
    const id = params.id;

    const url = this.url + "/" + resource + "/" + id;
    const result =  (await httpClient(url, {method: "GET"}));
    const data = result.json
    return data;
  }

  async deleteMany<RecordType extends RaRecord<Identifier> = any>(
    resource: string, 
    params: DeleteManyParams<RecordType>
  ) : Promise<DeleteManyResult<RecordType>>{
    const singularResource = resource.slice(0, resource.length - 2); //strip the s
    const manyIds = {
      [singularResource + "Ids"]: params.ids
    };

    const converted = convertToArrayNotation(manyIds);
    
    const url = queryString.stringifyUrl({url: this.url + "/" + resource, query: converted});

    const result =  (await httpClient(url, {method: "DELETE"}));
    const data = result.json
    return data;
  };

}