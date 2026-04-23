package campinglist.service;

import campinglist.entity.Item;
import campinglist.repository.ItemRepository;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class ItemService {

    private final ItemRepository repository;

    public ItemService(ItemRepository repository) {
        this.repository = repository;
    }

    public Item createItem(Item item) {
        return repository.save(item);
    }

    public Item separatedItem(Long id) {
        Item item = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Item não encontrado"));
        
        item.setSeparated(!item.isSeparated());

        return repository.save(item);
    }

    public List<Item> getAllItems() {
        return repository.findAll();
    }

    public Item getItemById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Item não encontrado"));
    }

    public Item updateItem(Long id, Item itemDetails) {
        Item item = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Item não encontrado"));

        item.setName(itemDetails.getName());
        item.setSeparated(itemDetails.isSeparated());

        return repository.save(item);
    }

    public void deleteItem(Long id) {
       repository.deleteById(id);

    }
}
