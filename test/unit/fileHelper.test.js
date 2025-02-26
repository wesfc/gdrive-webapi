import { describe, test, expect, jest } from '@jest/globals';
import Routes from '../../src/routes.js';
import fs from 'fs';
import FileHelper from '../../src/fileHelper.js';

describe('#FileHelper test suite', () => {
    describe('#getFileStatus', () => {
        test('it should return files statuses in correct format', async () => {
            const statMock = {
                dev: 2080,
                mode: 33188,
                nlink: 1,
                uid: 1000,
                gid: 1000,
                rdev: 0,
                blksize: 4096,
                ino: 74898,
                size: 10414,
                blocks: 24,
                atimeMs: 1740515374723.5183,
                mtimeMs: 1740515373324.061,
                ctimeMs: 1740515373324.061,
                birthtimeMs: 1740515373260.9277,
                atime: '2025-02-25T20:29:34.724Z',
                mtime: '2025-02-25T20:29:33.324Z',
                ctime: '2025-02-25T20:29:33.324Z',
                birthtime: '2025-02-25T20:29:33.261Z'
            }

            const expectedOwner = 'wesleycarvalho';
            process.env.USER = expectedOwner;
            const filename = 'fatNiko.jpg'

            // jest.spyOn(fs.promises, fs.promises.stat.name)
            //     .mockRejectedValue(statMock);

            // jest.spyOn(fs.promises, fs.promises.readdir.name)
            //     .mockRejectedValue([filename]);

            // It will never reach /tmp folder, because we are mocking fs.stat
            // The wrong path is passed in proposital way.
            const result = await FileHelper.getFilesStatus('/tmp')

            const expectedResult = [
                {
                    size: '10 kb',
                    birthtime: statMock.birthtime,
                    owner: expectedOwner,
                    file: filename
                }
            ];

            expect(fs.promises.stat).toHaveBeenCalledWith(`/tmp/${filename}`);
            expect(result).toMatch(expectedResult);
        });
    });
});