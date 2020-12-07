import { query } from '../database';

export async function findLists(): Promise<string[]> {

  const results = await query<{list_id: string}>('SELECT DISTINCT list_id FROM todo');
  return results.map( v => v.list_id);

}
