using HealthExpertAPI.DTO.DTOCourse;

namespace HealthExpertAPI.Extension.ExCourse
{
    public static class TypeExtension
    {
        public static TypeDTO ToTypeDTO(this BussinessObject.Model.ModelCourse.Type type)
        {
            return new TypeDTO
            {
                typeId = type.typeId,
                typeName = type.typeName,
                typeDescription = type.typeDescription
            };
        }

        public static BussinessObject.Model.ModelCourse.Type ToTypeAdd(this TypeDTO typeDTO)
        {
            return new BussinessObject.Model.ModelCourse.Type
            {
                typeId = typeDTO.typeId,
                typeName = typeDTO.typeName,
                typeDescription = typeDTO.typeDescription
            };
        }
    }
}
