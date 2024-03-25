# iMAX SmartSupplier Web

## Công nghệ sử dụng:

- [Nextjs](https://nextjs.org/docs/getting-started) Typescript (Using Pages Router)
- [tailwindcss](https://tailwindcss.com/docs/display) style giao diện

  - [plugins:tailwind-scrollbar](https://www.npmjs.com/package/tailwind-scrollbar)
  - [plugins:tailwindcss-animate](https://github.com/jamiebuilds/tailwindcss-animate)
  - [plugins:tailwind-merge](https://github.com/dcastil/tailwind-merge/blob/v1.13.1/docs/README.md)

- [react-aria-components](https://react-spectrum.adobe.com/react-aria/react-aria-components.html#examples) unstyled components
- [react-aria](https://react-spectrum.adobe.com/react-aria/getting-started.html) xử lý các hành động với các components
- [react-stately](https://react-spectrum.adobe.com/react-stately/getting-started.html) xử lý trạng thái trong components stately

  - [rac-tailwind](https://reactspectrum.blob.core.windows.net/reactspectrum/f239d0b1a96c3e6119135fe6bbf1994dc9984257/verdaccio/rac-tailwind/index.html)

- [react-hook-form](https://react-hook-form.com/docs/useform) xử lý thao tác với form
- [Yup](https://github.com/jquense/yup#table-of-contents) xác thực dữ liệu
- [Dayjs](https://day.js.org/docs/en/display/format) xử lý các tác vụ thời gian
- [react-use](https://streamich.github.io/react-use/) xử lý các hooks phổ biến

## Cấu trúc dự án

```graphql
.
├── src
│   ├── components
│   ├── app
│   ├── public
│   ├── redux
│   └── [..]
└── [..]
```

## Cài đặt

### Cài lib

```bash
yarn install
```

### Biến môi trường

Tạo file `.env.local` ở thư mục gốc, thêm các biến môi trường cần thiết:

```bash
NEXT_PUBLIC_API_ENDPOINT=https://development.imaxhitech.com:10000
```

## Convention

- Sử dụng absolute import path `@/*`

  ```js
  // Import bằng absolute path ✅
  import ABC from "@/components/layout/ABC";
  ```

- Các **page** (trang chính) sẽ được viết trong `src/app/**` như document của `NextJS`
- Trong `src/app/_components/**` chứa các component sử dụng xuyên suốt toàn trang

  Các components đều `unstyled` nên khi sử dụng cần thêm vào class `tailwindcss` để style đc như ý.

- Trong `src/types` định nghĩa các **type** sử dụng

  đặt tên `type T${type_name} = {}` để dễ dàng gợi ý từ VScode khi gõ `T`

- **Internationalization** (i18n) trong `src/i18n/*`

  sử dụng thông qua hooks `useTranslation`

- Gõ `rafc-default` để đc gợi ý snippet cấu trúc code cho file

  đc cài đặt ở trong `./.vscode/vscode.code-snippets`

- **Lint** và **format** code:

  Lưu lại file sẽ đc tự động format code

  Các import đc tự sắp xếp và đc xóa những cái ko dùng đến

- **Commit lint**:

  ```shell
  type(scope?): subject
  ```

  với:

  - `type` là mộ trong những keyword dưới (tham khảo `Angular`)

    - **build**: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
    - **ci**: Changes to our CI configuration files and scripts (example scopes: Gitlab CI, Circle, BrowserStack, SauceLabs)
    - **chore**: add something without touching production code (Eg: update npm dependencies)
    - **docs**: Documentation only changes
    - **feat**: A new feature
    - **fix**: A bug fix
    - **perf**: A code change that improves performance
    - **refactor**: A code change that neither fixes a bug nor adds a feature
    - **revert**: Reverts a previous commit
    - **style**: Changes that do not affect the meaning of the code (Eg: adding white-space, formatting, missing semi-colons, etc)
    - **test**: Adding missing tests or correcting existing tests
      scope là optional, phạm vi ảnh hưởng của commit hiện tại

  - `subject` là nội dung của commit

  ```shell
  # VD commit khi thêm tính năng gọi API login:
  git commit -m "feat: add call API login
  ```
