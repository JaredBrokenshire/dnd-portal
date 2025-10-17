import axios from "@/libs/axios";

const baseUrl = "/characters"

export default {
  update(characterId, inventoryItemId, dto) {
    return axios.put(`${baseUrl}/${characterId}/inventory-item/${inventoryItemId}`, dto)
  }
}