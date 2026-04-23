package campinglist.mapper;

import campinglist.dto.ItemRequestDto;
import campinglist.dto.ItemResponseDto;
import campinglist.entity.Item;

public class ItemMapper {

    public static Item toEntity(ItemRequestDto dto) {

        Item item = new Item();
        item.setName(dto.name());
        item.setSeparated(dto.separated());

        return item;

    }

    public static ItemResponseDto toResponseDto(Item item) {

        return new ItemResponseDto(

                item.getId(),
                item.getName(),
                item.isSeparated()

        );

    }
}