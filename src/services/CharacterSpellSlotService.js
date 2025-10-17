import axios from "@/libs/axios";

const baseUrl = "/characters"

export default {
  update(characterId, spellLevel, dto) {
    return axios.put(`${baseUrl}/${characterId}/spell-slots/${spellLevel}`, dto)
  }
}