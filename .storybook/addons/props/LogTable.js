import React from 'react';
import { Link } from '@storybook/components';
import Table from './Table';

function TypeLabel({ type }) {
  const labels = {
    break: '💥 Breaking',
    release: '🎉 Release',
    new: '🚀 New',
    update: '🚀 Update',
    feature: '🚀 Feature',
    fix: '🐞 Fix',
    deps: '📘 Docs',
    docs: '🎉 Release',
    style: '🎨 Styles',
    security: '🔑 Security',
    revert: '⚙️ Reverts',
    ci: '🛠 Internals (CI)',
    build: '🛠 Internals (Build)',
    test: '🛠 Internals (Test)',
    internal: '🛠 Internals',
  };

  if (labels[type]) {
    return <span>{labels[type]}</span>;
  }

  return <span>📋 Misc</span>;
}

export default function LogTable({ logs }) {
  return (
    <Table>
      <thead>
        <tr>
          <th>Commit</th>
          <th>Type</th>
          <th>Date</th>
          <th>Hash</th>
        </tr>
      </thead>
      <tbody>
        {logs.map((log, i) => (
          <tr key={i}>
            <td>{log.message}</td>
            <td>
              <TypeLabel type={log.type} />
            </td>
            <td>{new Date(log.date * 1000).toDateString()}</td>
            <td>
              <Link
                cancel
                onClick={() => {
                  window.open(`https://github.com/airbnb/lunar/commit/${log.hash}`);
                }}
              >
                {log.hash}
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
