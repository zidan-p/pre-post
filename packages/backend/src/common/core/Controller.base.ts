

interface IInteractor {
  reject(message: string, metadata?: Record<string, any>): any;
  ok(args: any): any;
}

// T is result from usecase
abstract class BaseController<T>{

  constructor(
    private interactor: IInteractor
  ){}

  abstract executeImpl(): Promise<any>;

  ok(data: T){
    return this.interactor.ok(data);
  }

}


class AUseCase{

  execute(){
    console.log("ini adalah eksekusi use case");
    return {message: "haiii"};
  }
}

class LoginController extends BaseController<{message: string}>{
  private aUseCase: AUseCase;

  constructor(someInteractor: IInteractor, aUseCase: AUseCase){
    super(someInteractor);
    this.aUseCase = aUseCase;
  }

  executeImpl(): Promise<any> {
    
    const result = this.aUseCase.execute();
    return this.ok(result);
  }
}


class RealInteractor implements IInteractor {

  constructor(Req, Res){}

  reject(message: string, metadata?: Record<string, any>) {
    console.log(message);
  }
  ok(args: any) {
    console.log(args);
  }
}







userRouter.post('/',
  (req, res) => new LoginController(new RealInteractor(req, res), new AUseCase()).executeImpl()
);