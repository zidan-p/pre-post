import { 
  CreateParams, DataProvider, DeleteManyParams, DeleteManyResult, DeleteParams, 
  DeleteResult, GetListParams, GetManyParams, GetManyReferenceParams, GetManyReferenceResult, 
  GetManyResult, GetOneParams, GetOneResult, Identifier, RaRecord, UpdateManyParams, 
  UpdateManyResult, UpdateParams, UpdateResult
} from "react-admin";
import { FilterType, RemoteQueryFilter } from "../shared/types/filter.type";
import { convertToArrayNotation } from "../shared/utils/object";
import queryString from "query-string";
import { convertObjectToFormDataWithRactAdminFileResolver } from "./utils";
import { requestor } from "./requestor";



// const httpClient = fetchUtils.fetchJson;

export class BasePrepostDataProvider implements DataProvider {
  private readonly url: string

  constructor(url: string){ this.url = url }

  async getList(resource: string, params: GetListParams){
    const {page, perPage} = params.pagination;
    let {field, order} = params.sort;
    const filter = params.filter as Partial<FilterType>;

    if(field === "id"){
      // use resource suffix for sorting by id
      const singularResource = resource.slice(0, resource.length - 1); //strip the s
      field = singularResource + "Id";
    }

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

    const result =  await requestor(url, {method: "GET"});
    const returnResult = result.data
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
    const result =  (await requestor(url, {method: "GET"}));
    const data = result.data
    return data;
  };

  async getMany<RecordType extends RaRecord<Identifier> = any>(
    resource: string, 
    params: GetManyParams
  ): Promise<GetManyResult<RecordType>>{


    const singularResource = resource.slice(0, resource.length - 1); //strip the s
    const manyIds = {
      [singularResource + "Ids"]: params.ids
    };

    const converted = convertToArrayNotation(manyIds);
    
    const url = queryString.stringifyUrl({url: this.url + "/" + resource, query: converted});

    const result =  (await requestor(url, {method: "GET"}));
    const data = result.data
    return data;
  };

  async getManyReference<RecordType extends RaRecord<Identifier> = any>(
    resource: string, 
    params: GetManyReferenceParams
  ) : Promise<GetManyReferenceResult<RecordType>>{

    const {page, perPage} = params.pagination;
    let {field, order} = params.sort;
    const filter = params.filter as Partial<FilterType>;

    if(field === "id"){
      // use resource suffix for sorting by id
      const singularResource = resource.slice(0, resource.length - 1); //strip the s
      field = singularResource + "Id";
    }

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

    const result =  (await requestor(url, {method: "GET"}));
    const data = result.data
    return data;
  }

  async update<RecordType extends RaRecord<Identifier> = any>(
    resource: string, 
    params: UpdateParams<any>
  ):  Promise<UpdateResult<RecordType>>{
    const id = params.id;

    // console.log(JSON.stringify(params, null, 2))
    // console.log(JSON.stringify(params.data, null, 2))
    // console.log(JSON.stringify(params?.meta, null, 2))
    // console.log("id request form data : " + String(params.meta?.isFormData));
    // console.log(params.meta.isFormData === true ? "formdata seharusnya true boolean" : "formdata seharusnya false bolean")

    // console.log(params.meta.isFormdata ? "formdata seharusnya true" : "formdata seharusnya false")
    let body: any = params.meta.isFormData === true ? convertObjectToFormDataWithRactAdminFileResolver(params.data) : params.data;
    // if(params.meta.isFormdata === true){ 
    //   console.log("menggunakan form data")
    //   body = convertObjectToFormDataWithRactAdminFileResolver(params.data);
    //   console.log("id request form data : " + String(params.meta?.isFormData));
    // }else {
    //   console.log("tidak menggunakan form data")
    //   console.log(params.meta?.isFormData);
    //   body = params.data;
    // }

    console.log(params)
    // console.log("update body::::")
    // console.log(body)
    const url = this.url + "/" + resource + "/" + id;
    const result =  await requestor(url, {method: "PUT", data: body});
    const data = result.data
    return data;
  }

  async updateMany<RecordType extends RaRecord<Identifier> = any>(
    resource: string, 
    params: UpdateManyParams<any>
  ) :Promise<UpdateManyResult<RecordType>>{
    const singularResource = resource.slice(0, resource.length - 1); //strip the s
    const manyIds = {
      [singularResource + "Ids"]: params.ids
    };

    let body: any;
    if(params.meta?.isFormdata) body = convertObjectToFormDataWithRactAdminFileResolver(params.data);
    else body = params.data;

    const converted = convertToArrayNotation(manyIds);
    
    const url = queryString.stringifyUrl({url: this.url + "/" + resource, query: converted});

    const result =  (await requestor(url, {method: "PUT", data: body}));
    const data = result.data
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
    if(params.meta?.isFormdata) body = convertObjectToFormDataWithRactAdminFileResolver(params.data);
    else body = params.data;

    const url = this.url + "/" + resource;
    const result =  (await requestor(url, {method: "POST", data: body}));
    const data = result.data;
    return data;
  };

  async delete<RecordType extends RaRecord<Identifier> = any>(
    resource: string, 
    params: DeleteParams<RecordType>
  ) : Promise<DeleteResult<RecordType>>{
    const id = params.id;

    const url = this.url + "/" + resource + "/" + id;
    const result =  (await requestor(url, {method: "GET"}));
    const data = result.data
    return data;
  }

  async deleteMany<RecordType extends RaRecord<Identifier> = any>(
    resource: string, 
    params: DeleteManyParams<RecordType>
  ) : Promise<DeleteManyResult<RecordType>>{
    const singularResource = resource.slice(0, resource.length - 1); //strip the s
    const manyIds = {
      [singularResource + "Ids"]: params.ids
    };

    const converted = convertToArrayNotation(manyIds);
    
    const url = queryString.stringifyUrl({url: this.url + "/" + resource, query: converted});

    const result =  (await requestor(url, {method: "DELETE"}));
    const data = result.data
    return data;
  };

}