import request from "supertest";
import App from "../../src/app";
import * as adminService from "../../src/services/admin.service";

const app = new App().app;

describe("Test admin controller", () => {
  it("should return 200", async () => {
    const mockAdmins = [
      {
        id: 1,
        name: "Admin 1",
        email: "admin1",
        password_hash: "password1",
        created_at: new Date(),
      },
      {
        id: 2,
        name: "Admin 2",
        email: "admin2",
        password_hash: "password2",
        created_at: new Date(),
      },
    ];
    jest
      .spyOn(adminService, "getAllAdminService")
      .mockResolvedValue(mockAdmins);

    const response = await request(app).get("/auth/all");
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("Success");
    expect(response.body.data).toMatchObject([
      {
        id: 1,
        name: "Admin 1",
        email: "admin1",
        password_hash: "password1",
        created_at: expect.any(String),
      },
      {
        id: 2,
        name: "Admin 2",
        email: "admin2",
        password_hash: "password2",
        created_at: expect.any(String),
      },
    ]);
  });
});
