import request from "supertest";
import App from "../../src/app";
import * as adminService from "../../src/services/admin.service";

const app = new App().app;

describe("Admin controller", () => {
  describe("GET /admin/all", () => {
    it("should return all admins", async () => {
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

  describe("POST /admin/signin", () => {
    it("should sign in successfully", async () => {
      const mockAdmins = {
        name: "Admin 1",
        email: "admin1@example.com",
        token: "token",
      };

      jest.spyOn(adminService, "signInService").mockResolvedValue(mockAdmins);
      const response = await request(app).post("/auth/signin").send({
        email: "admin1@example.com",
        password: "password1",
      });
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("Success");
      expect(response.body.data).toHaveProperty("token");
    });
  });

  describe("POST /admin/signup", () => {
    it("should sign up successfully", async () => {
      const mockAdmin = {
        id: 1,
        name: "Admin 1",
        email: "admin1@example.com",
        created_at: new Date(),
      };

      // jest.spyOn(adminService, "signUpService").mockResolvedValue(mockAdmin);

      const response = await request(app).post("/auth/signup").send({
        name: "Admin 1",
        email: "admin1@example.com",
        password: "password123",
      });

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("Admin Created Successfully");
      expect(response.body.data).toMatchObject({
        id: 1,
        name: "Admin 1",
        email: "admin1@example.com",
      });
    });
  });
});
