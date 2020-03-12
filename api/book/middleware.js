class BookMiddleware extends Middleware {
  constructor() {
    super();
    this.white_list = [
      "/api/book/comic/my_comic"
    ]
  }
}

module.exports = new BookMiddleware();
