using System;
using System.Collections.Generic;
using System.Text;

namespace PocAgenda.Entities.Dto
{
    public class ResponseDataDto<T>
    {
        public long Id { get; set; }
        public bool Success { get; set; } = false;
        public T Data { get; set; }
        public int StatusCode { get; set; }
        public string Message { get; set; }
    }
}
