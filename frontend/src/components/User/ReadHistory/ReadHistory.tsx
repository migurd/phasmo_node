import { useEffect, useState } from 'react';
import './ReadHistory.css'
import { getIdUser, getUserStatistics } from '../../../consumers/UserApi';
import IStatistic from '../../../../../backend/src/Models/Statistic';

export default function GuessTheGhost() {
  const [userStatistics, setUserStatistics] = useState<IStatistic[]>();

  const getUserStats = async ()  => {
    const id_user = await getIdUser();
    const user_statistics = await getUserStatistics(id_user);
    setUserStatistics(user_statistics);
  }

  useEffect(() => {
    getUserStats();
  }, []);

  return (
    <div id="history">
      <table className="statistics-table">
        <thead>
          <tr>
            <th>Ghost Name</th>
            <th>Found Count</th>
            <th>Discovered Count</th>
            <th>Dead Count</th>
          </tr>
        </thead>
        <tbody>
          {userStatistics ? userStatistics.map((statistic, index) => (
            <tr key={index}>
              <td>{statistic.ghost_name}</td>
              <td>{statistic.found_count}</td>
              <td>{statistic.discovered_count}</td>
              <td>{statistic.dead_count}</td>
            </tr>
          )) : <></> }
        </tbody>
      </table>
    </div>
  )
}