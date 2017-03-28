// type Method: (s: string) => ['POST', 'GET'].indexOf(s) > 0

export interface RequestOption {

  uri: string
  method: string
  data: Object
  body: string
  headers: Object

}
